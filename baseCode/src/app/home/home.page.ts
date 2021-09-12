import { Component } from '@angular/core';
import {Downloader,DownloadRequest,NotificationVisibility} from '@ionic-native/downloader/ngx' // Native android downloader plugin
import {Zip} from '@ionic-native/zip/ngx' 
import {File} from '@ionic-native/file/ngx'
import { Filesystem} from '@capacitor/filesystem'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loc:any=""
  data:any=""
  constructor(private downloader:Downloader, public zip:Zip, public file:File) {}
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
  Download5(){
    var request: DownloadRequest = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/downloader-31ec1.appspot.com/o/download5.zip?alt=media&token=f1362ab4-78db-45d3-a21e-e690345c8ce4',
    title: 'MyDownload5',
    description: '',
    mimeType: '',
    visibleInDownloadsUi: true,
    notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
    destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'MyZip.zip'
    }
  };


     this.downloader.download(request).then((location:string)=>{
        alert('Working Director: '+this.file.externalApplicationStorageDirectory);
        this.loc=location;
        this.zip.unzip(this.loc,this.file.externalApplicationStorageDirectory+'Extracted/', (progress) => console.log('Unzipping, ' + Math.round((progress.loaded / progress.total) * 100) + '%'))
      .then((result) => {
        if(result === 0){
          console.log('SUCCESS');
          this.loc="Sucess";
          this.file.listDir(this.file.externalApplicationStorageDirectory, 'Extracted').then(async (results) => {
            console.log(results);
             for (let f of results) {
               if (f.isDirectory == true && f.name != '.' && f.name != '..') {
                 console.log("This is a folder");
               } else if (f.isFile == true) {
                 console.log("This is a file");
                 let name = f.name 
                 console.log("file name: " + name);
                  
                  await Filesystem.readFile({
                    path: this.file.externalApplicationStorageDirectory+'Extracted/'+name
                  }).then(res => {
                    let data=res.data.toString()
                    if(name[0]=='R')
                    console.log("file data:"+ atob(data))
                  });
                  
               }
             }
          });
        } 
        if(result === -1) console.log('FAILED');
        
      });
      
      },(err)=>{
        alert(JSON.stringify(err));
      })
  }
}
