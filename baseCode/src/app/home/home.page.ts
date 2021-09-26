import { Component } from '@angular/core';
import {Downloader,DownloadRequest,NotificationVisibility} from '@ionic-native/downloader/ngx' // Native android downloader plugin
import {Zip} from '@ionic-native/zip/ngx' 
import {File} from '@ionic-native/file/ngx'
import { Filesystem} from '@capacitor/filesystem'
import {SQLite,SQLiteObject} from '@ionic-native/sqlite/ngx'
import { range } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loc:any=""
  data:any=""
  private database: SQLiteObject;
  constructor(private downloader:Downloader, public zip:Zip, public file:File,public sqlite:SQLite) {
    this.sqlite.create({name:'data.db',location:'default'}).then((db:SQLiteObject)=>{
      this.database = db
      db.executeSql(`create table if not exists filedata(
        filename char(10) ,
        path char(20) PRIMARY KEY,
        data LONGTEXT
      )`,[]).then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }
  
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
  async readDir(Curpath: string,Curfolder: string){
    this.file.listDir(Curpath, Curfolder).then(async (results) => {
      console.log(results);
      for (let f of results) {
        if (f.isDirectory == true && f.name != '.' && f.name != '..') {
          console.log("This is a folder"+f.name);
          await this.readDir(Curpath+Curfolder+'/',f.name);
        } 
        else if (f.isFile == true) {
          console.log("This is a file");
          let name = f.name 
          console.log("file name: " + name);
            
          await Filesystem.readFile({
            path: Curpath+Curfolder+'/'+name
          }).then(res => {
            let data=res.data.toString()
            let q = "INSERT INTO filedata (filename,path,data) VALUES (?, ?, ?) ON CONFLICT(path) DO UPDATE SET data = ?";
            this.database.executeSql(q,[name,Curpath+Curfolder+'/'+name,data,data])
          });   
         }
       }
    });
  }

  Download5(){
    var request: DownloadRequest = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/downloader-31ec1.appspot.com/o/download5.zip?alt=media&token=4b9f01ed-95fc-446f-9ded-78d3f1a21a98',
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
        this.zip.unzip(this.loc,this.file.externalApplicationStorageDirectory+'Extracted/0/', (progress) => console.log('Unzipping, ' + Math.round((progress.loaded / progress.total) * 100) + '%'))
      .then(async (result) => {
        if(result === 0){
          console.log('SUCCESS');
          this.loc="Success";
          await this.readDir(this.file.externalApplicationStorageDirectory,'Extracted');
        } 
        if(result === -1) console.log('FAILED');
        
      });
      
      },(err)=>{
        alert(JSON.stringify(err));
      })
  }

  Download6(){
    var request: DownloadRequest = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/downloader-31ec1.appspot.com/o/download5.zip?alt=media&token=4b9f01ed-95fc-446f-9ded-78d3f1a21a98',
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
        this.zip.unzip(this.loc,this.file.externalApplicationStorageDirectory+'Extracted/1/', (progress) => console.log('Unzipping, ' + Math.round((progress.loaded / progress.total) * 100) + '%'))
      .then(async (result) => {
        if(result === 0){
          console.log('SUCCESS');
          this.loc="Success";
          await this.readDir(this.file.externalApplicationStorageDirectory,'Extracted');
        } 
        if(result === -1) console.log('FAILED');
        
      });
      
      },(err)=>{
        alert(JSON.stringify(err));
      })
  }


  AccessDB(){
    this.database.executeSql("SELECT * FROM filedata", []).then((data) => {
      console.log("Reading DB :"+data.rows.length)
      if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
              console.log(data.rows.item(i).filename + ' : ' + data.rows.item(i).path)
          }
      }
      console.log("Read DB")
  }, (e) => {

      console.log("Error: " + JSON.stringify(e));
  });
  }

  DeleteDB(){
    let q = "DELETE FROM filedata";
    this.database.executeSql(q,[])
  }

  DropDB(){
    let q = "DROP TABLE filedata";
    this.database.executeSql(q,[])
    alert('!!!RESTART APP!!!')
  }

  
  
  
  
  list=[
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file1.zip?alt=media&token=14a35fa1-03d6-4818-97b6-3734ccd3ed21',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file2.zip?alt=media&token=526bdc1a-4554-4b90-8cf7-c1e439ced416',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file3.zip?alt=media&token=d8ca2820-967a-4c12-8e84-dfecf0eabf8c',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file4.zip?alt=media&token=220c63e7-5bef-4fc9-9966-900a4e6f3f9e',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file5.zip?alt=media&token=629cde06-c71e-4b81-9f0d-8dcdb615d7a6',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file6.zip?alt=media&token=3acdc5d7-3469-424c-b550-bb3aad294d18',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file7.zip?alt=media&token=269640d0-2d5d-47bc-96a0-9cca063ea84f',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file8.zip?alt=media&token=927fb4f2-6810-4524-9760-43c26202012f',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file9.zip?alt=media&token=0e2ec939-8c74-486f-96e3-ffdf0303c8bc',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file10.zip?alt=media&token=670b6e33-a42e-4c5a-9c21-9b5bfbbf92bd',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file11.zip?alt=media&token=078aaaeb-906c-4a3c-874c-fd75f2617a68',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file12.zip?alt=media&token=ec37ba99-5677-4145-83bd-9b932edb7ee6',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file13.zip?alt=media&token=7fe837bd-1b8f-4583-885b-dcfe22665063',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file14.zip?alt=media&token=8f067500-e41f-42f1-8b78-966b34e6d490',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file15.zip?alt=media&token=11c9e874-e8ce-4a7c-a939-48bc247a0c74',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file16.zip?alt=media&token=dd9881c0-633b-46bc-b8fc-1ee6b14ed9e3',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file17.zip?alt=media&token=f8cec6c6-0ac5-45af-8536-73aa688a0486',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file18.zip?alt=media&token=ac352ee1-34ff-4273-acbc-f2f5830db589',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file19.zip?alt=media&token=159959e3-db63-4141-8408-206b536daa5d',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file20.zip?alt=media&token=4212ec71-2bd4-49da-9a85-d3bd6b7eb416',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file21.zip?alt=media&token=77e4de9f-5615-49bf-915e-22cab104ed37',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file22.zip?alt=media&token=35f3948c-01d7-43ad-9ecd-251d08c9c6ec',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file23.zip?alt=media&token=d113e866-dfa7-4ed7-93da-aba9331eb5c8',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file24.zip?alt=media&token=d3dbe1c6-a8a8-4289-8cb6-31ae26d84ea1',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file25.zip?alt=media&token=29e4d1b1-fa11-4d50-ac04-c3c51f5984d8',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file26.zip?alt=media&token=3dc99667-9764-4d24-9b06-35b8d5f55af0',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file27.zip?alt=media&token=683d1c7e-04cc-4420-b2eb-99e7e1bf41ca',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file28.zip?alt=media&token=26e09d70-a415-4199-bb7c-a2e480cc11e8',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file29.zip?alt=media&token=1d26ca2f-0e96-4d7b-9c2d-4cf7c66b3241',
    'https://firebasestorage.googleapis.com/v0/b/crashtest-86ceb.appspot.com/o/file30.zip?alt=media&token=01d70e46-bf46-43df-9047-b4c4bd10f67c'
  ]
  index=0;
  DownloadFileAt(ind){
    if(ind>=5) return;
    var request: DownloadRequest = {
      uri: this.list[ind],
      title: 'CrashTest'+ind.toString(),
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: 'MyZip'+ind.toString()+'.zip'
        }
    };
    this.downloader.download(request).then((location:string)=>{
      this.loc=location;
      this.zip.unzip(this.loc,this.file.externalApplicationStorageDirectory+'Extracted/'+ind.toString()+'/', (progress) => console.log('Unzipping, ' + Math.round((progress.loaded / progress.total) * 100) + '%'))
    .then(async (result) => {
      if(result === 0){
        console.log('SUCCESS');
        this.loc="Success";
        await this.readDir(this.file.externalApplicationStorageDirectory+'Extracted/',ind.toString());
        this.index++;
        this.DownloadFileAt(this.index);
      } 
      if(result === -1) console.log('FAILED');
      
    });
    
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }

  CrashTest(){
    this.DownloadFileAt(this.index);
  }

}
