import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
//import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  public photos: ProductImg[] = [];
  constructor( ) { }

  async agregarGaleria(){
    const foto = await Camera.getPhoto(
      {
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        promptLabelHeader:"¿Vas a? ",
        promptLabelCancel:"Cancelar",
        promptLabelPicture:"Tomar una foto",
        promptLabelPhoto:"Seleccionar una foto",
        allowEditing:true,
        quality: 100
      }
    );
    const savedImageFile = await this.savePicture(foto);
    this.photos.unshift(savedImageFile!);
  }

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
  
    // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents
    });
  
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      //webviewPath: photo.webPath
      webviewPath: photo.webPath
    };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}

export interface ProductImg {
  filepath: string;
  webviewPath?: string;
}
