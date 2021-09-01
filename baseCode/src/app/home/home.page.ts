import { Component } from '@angular/core';
import {Downloader,DownloadRequest,NotificationVisibility} from '@ionic-native/downloader/ngx' // Native android downloader plugin
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private downloader:Downloader) {}
  // firebase link for 440 mb file
  Download1(){
    var request: DownloadRequest = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/downloader-31ec1.appspot.com/o/minecraftSave.zip?alt=media&token=1dd37478-43ff-443a-be8a-fb1ddaa1e6a3',
    title: 'MyDownload1',
    description: '',
    mimeType: '',
    visibleInDownloadsUi: true,
    notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
    destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'MyFile.apk'
    }
  };


    this.downloader.download(request)
    .then((location: string) => console.log('File downloaded at:'+location))
    .catch((error: any) => console.error(error));
  }
  // firebase link for 270 mb file
  Download2(){
    var request: DownloadRequest = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/downloader-31ec1.appspot.com/o/ThreeJsMaster.zip?alt=media&token=710e662f-9438-4eeb-80f5-eacb4c330e4f',
    title: 'MyDownload2',
    description: '',
    mimeType: '',
    visibleInDownloadsUi: true,
    notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
    destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'MyFile.apk'
    }
  };


    this.downloader.download(request)
    .then((location: string) => console.log('File downloaded at:'+location))
    .catch((error: any) => console.error(error));
  }
  // // firebase link for 10 mb file
  Download3(){
    var request: DownloadRequest = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/downloader-31ec1.appspot.com/o/data%20structures.zip?alt=media&token=0bdbc66f-6f43-4c8d-8118-cd2f6ede52e5',
    title: 'MyDownload3',
    description: '',
    mimeType: '',
    visibleInDownloadsUi: true,
    notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
    destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'MyFile.apk'
    }
  };


    this.downloader.download(request)
    .then((location: string) => console.log('File downloaded at:'+location))
    .catch((error: any) => console.error(error));
  }

  // Junk file for 1GB from internet. 
  Download4(){
    var request: DownloadRequest = {
    uri: 'https://speed.hetzner.de/1GB.bin',
    title: 'MyDownload4',
    description: '',
    mimeType: '',
    visibleInDownloadsUi: true,
    notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
    destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'MyFile.apk'
    }
  };


    this.downloader.download(request)
    .then((location: string) => console.log('File downloaded at:'+location))
    .catch((error: any) => console.error(error));
  }
}
