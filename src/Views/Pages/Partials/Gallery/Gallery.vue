<template>
    <Popup :is-wide="true" v-if="folder !== null">
        <div class="controls mb-2">
            <div class="row">
                <div class="col-6 col-form-label">
                    Folder: {{ folder?.name ?? 'Unknown' }}
                </div>
                <div class="col-6 text-end">
                    <div class="btn btn-outline-light me-2" @click="isOpen.newFolder = true">
                        <i class="fa-solid fa-folder-plus"></i>
                    </div>
                    <div class="btn btn-outline-light" @click="isOpen.uploadFile = true">
                        <i class="fa-solid fa-upload"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-group" style="height: 400px; overflow-y: auto">
            <div class="list-group-item text-center py-3" v-if="folder.files.length === 0 && folder.folders.length === 0">
                <span class="fa-4x">🕵️</span>
                <br>
                There's nothing here!
                <br><br>
                <div class="btn btn-outline-primary" @click="isOpen.uploadFile = true">
                    <i class="fa-solid fa-upload"></i>
                    Upload Something
                </div>
            </div>
            <div class="list-group-item list-group-item-folder" v-if="folder.parent !== null" @click="getFolder(folder.parent.id)">
                <i class="fa-fw fa-solid fa-arrow-up"></i>&nbsp;Up
            </div>
            <div class="list-group-item list-group-item-folder" v-for="(fo, i) in folder.folders">
                <div class="row">
                    <div class="col-9" @click="getFolder(fo.id)">
                        <i class="fa-fw fa-solid fa-folder"></i>&nbsp;{{ fo.name }}
                    </div>
                    <div class="col-3 text-end">
                        <a href="#" class="me-2" @click="() => { renameFolder(fo) }">
                            <i class="fa-solid text-white fa-fw fa-i-cursor"></i>
                        </a>
                        <a href="#" class="me-2" @click="() => { deleteFolder(fo) }">
                            <i class="fa-solid text-danger fa-fw fa-trash"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="list-group-item" v-for="(fi, j) in folder.files" :class="{'bg-success': fi.uploaded, 'list-group-item-file-hoverable': filesAreSelectable}">
                <div class="row">
                    <div class="col-9" @click="hasSelectableFiles ? $emit('fileSelected', fi) : () => {}">
                        <i class="fa-fw fa-solid fa-video" v-if="isVideo(fi)"></i>
                        <i class="fa-fw fa-solid fa-image" v-if="isImage(fi)"></i>
                        <i class="fa-fw fa-solid fa-file" v-if="!isVideo(fi) && !isImage(fi)"></i>
                        &nbsp;{{ fi.nice_name }}
                    </div>
                    <div class="col-3 text-end">
                        <a href="#" class="me-2" @click="() => { renameFile(fi) }">
                            <i class="fa-solid text-white fa-fw fa-i-cursor"></i>
                        </a>
                        <a href="#" class="me-2">
                            <i class="fa-solid text-danger fa-fw fa-trash"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <NewFolder
            @close="isOpen.newFolder = false"
            v-if="authUser !== null && isOpen.newFolder"
            :folder="folder"
            @success="folderAdded"
        ></NewFolder>
        <DeleteFolder
            @close="isOpen.deleteFolder = false"
            v-if="authUser !== null && isOpen.deleteFolder"
            :folder="folderToDelete"
            @success="folderDeleted"
        ></DeleteFolder>
        <RenameFolder
            @close="isOpen.renameFolder = false"
            v-if="authUser !== null && isOpen.renameFolder"
            :folder="folderToRename"
            @success="folderRenamed"
        ></RenameFolder>
        <UploadFile
            @close="isOpen.uploadFile = false"
            v-if="authUser !== null && isOpen.uploadFile"
            :folder="folder"
            @success="fileUploaded"
        ></UploadFile>
        <RenameFile
            @close="isOpen.renameFile = false"
            v-if="authUser !== null && isOpen.renameFile"
            :file="fileToRename"
            @success="fileRenamed"
        ></RenameFile>
    </Popup>
</template>

<script>
    import Popup from "../../../Components/Popup/Popup.vue";
    import GetFolderRequest from "../../../../Requests/GetFolderRequest";
    import Server from "../../../../Servers/Server";
    import NewFolder from "./NewFolder.vue";
    import DeleteFolder from "./DeleteFolder.vue";
    import RenameFolder from "./RenameFolder.vue";
    import UploadFile from "./UploadFile.vue";
    import RenameFile from "./RenameFile.vue";

    export default {
        components: {
            Popup,
            NewFolder,
            DeleteFolder,
            RenameFolder,
            UploadFile,
            RenameFile,
        },
        computed: {
            filesAreSelectable () {
                if (typeof this.hasSelectableFiles === 'undefined') {
                    return false;
                }
                return this.hasSelectableFiles;
            }
        },
        data () {
            return {
                fileToRename: null,
                folder: null,
                folderToDelete: null,
                folderToRename: null,
                getFolderRequest: new GetFolderRequest,
                isOpen: {
                    deleteFolder: false,
                    newFolder: false,
                    uploadFile: false,
                }
            };
        },
        methods: {
            isImage (file) {
                return file.mime.substring(0, 5) === 'image';
            },
            isVideo (file) {
                return file.mime.substring(0, 5) === 'video';
            },
            deleteFolder (folder) {
                this.folderToDelete = folder;
                this.isOpen.deleteFolder = true;
            },
            renameFolder (folder) {
                this.folderToRename = folder;
                this.isOpen.renameFolder = true;
            },
            renameFile (file) {
                this.fileToRename = file;
                this.isOpen.renameFile = true;
            },
            fileUploaded (file) {
                file.uploaded = true;
                this.folder.files.push(file);
                setTimeout(() => {
                    let listGroup = this.$el.getElementsByClassName('list-group')[0];
                    listGroup.scrollTo(0, listGroup.scrollHeight);
                }, 500);
                setTimeout(() => {
                    this.folder.files[this.folder.files.length - 1].uploaded = false;
                }, 2000);
                this.isOpen.uploadFile = false;
            },
            folderAdded (folder) {
                this.getFolder(this.folder.id);
                this.isOpen.newFolder = false;
            },
            folderDeleted (folderId) {
                for (let i = 0; i < this.folder.folders.length; i++) {
                    if (this.folder.folders[i].id === folderId) {
                        this.folder.folders.splice(i, 1);
                    }
                }
                this.isOpen.deleteFolder = false;
            },
            folderRenamed (folder) {
                for (let i = 0; i < this.folder.folders.length; i++) {
                    if (this.folder.folders[i].id === folder.id) {
                        this.folder.folders[i] = folder;
                    }
                }
                this.isOpen.renameFolder = false;
            },
            fileRenamed (file) {
                for (let i = 0; i < this.folder.files.length; i++) {
                    if (this.folder.files[i].id === file.id) {
                        this.folder.files[i] = file;
                    }
                }
                this.isOpen.renameFile = false;
            },
            getFolder(folderId) {
                if (typeof this.folder !== 'undefined') {
                    this.getFolderRequest = new GetFolderRequest(folderId);
                    this.getFolderRequest.submitTo(Server.getInstance())
                        .then(folder => {
                            this.folder = folder;
                        });
                }
            },
        },
        mounted () {
            this.getFolder(this.folderId);
        },
        props: [
            'authUser',
            'folderId',
            'hasSelectableFiles',
        ],
    }
</script>

<style lang="scss" scoped>
    .controls {
        background-color: #3f3f3f;
        padding: 0.5rem;
    }
    .list-group {
        .list-group-item {
            cursor: default;
            padding: 0.25rem;
        }
        .list-group-item-folder:hover {
            cursor: pointer;
            background-color: #3F3F3F;
        }
        .list-group-item-file-hoverable:hover {
            cursor: pointer;
            background-color: #3F3F3F;
        }
    }
</style>
