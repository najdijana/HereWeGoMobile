import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ImageLocationService } from './image-location.service';

@Component({
  selector: 'app-image-location-detector',
  templateUrl: './image-location-detector.page.html',
  styleUrls: ['./image-location-detector.page.scss'],
})
export class ImageLocationDetectorPage implements OnInit {
  uploadedImage: string | ArrayBuffer = '';
  file: File;
  predictedLocation: { name: string, description: string } | null = null;

  locations = [
    {
      name: 'Anjar',
      description: 'Welcome to Anjar, located in Lebanon\'s Bekaa Valley, is founded in the 8th century AD along the Silk Road. Reflecting the Umayyad period\'s architectural splendor, it features well-preserved ruins of imposing walls, towers, and mosques. The city served as a fortified commercial hub, offering a glimpse into a vibrant historical era. Explore remnants that connect with the past, revealing the significance of Anjar\'s cultural and trading heritage. Immerse yourself in the captivating history of this well-preserved gem. Thanks for your interest.'
    },
    {
      name: 'Baalbek',
      description: 'Explore Baalbek, a UNESCO World Heritage Site thriving in the Phoenician era and under Roman rule. Admire the blend of Roman and local architectural styles in the Temple of Jupiter and Temple of Bacchus, showcasing cultural and religious significance. Discover intriguing anecdotes, such as the Temple of Jupiter\'s past as one of the largest Roman temples and the intricate carvings in the Temple of Bacchus. Remarkable facts include the Temple of Jupiter\'s towering 20-meter columns and the Great Courtyard\'s capacity for 150,000 people during events.'
    },
    {
      name: 'BeiteddinePalace',
      description: 'Welcome to Beiteddine Palace, a cultural gem in Lebanon with roots in the 19th century. Renowned for its blend of Ottoman, Mamluk, and French architectural styles, the palace reflects Lebanon\'s rich history. Explore the intricately adorned rooms, lush gardens, and the stunning Emir Bachir Mosque within the palace grounds. Beiteddine stands as a testament to Lebanon\'s cultural heritage, offering visitors a glimpse into the opulent lifestyle of the ruling elite. Discover the palace\'s unique charm and historical significance. Thanks for your interest.'
    },
    {
      name: 'Byblos',
      description: 'Welcome to Byblos, an ancient coastal town in Lebanon. Recognized as one of the oldest inhabited cities, Byblos showcases diverse layers of civilizations, including Phoenician, Roman, and Ottoman influences. Explore its well-preserved archaeological sites, such as the Crusader Castle and Roman Amphitheater. Wander through the charming streets lined with historic buildings and visit the iconic Byblos Castle. Immerse yourself in the rich tapestry of Byblos\' past and present, where history and modernity seamlessly coexist. Thanks for your interest.'
    },
    {
      name: 'CedarsOfGod',
      description: 'Welcome to the Cedars of God, a majestic forest in Lebanon, revered for its ancient cedar trees. With roots reaching back to biblical times, these cedars are symbolic of Lebanon\'s enduring natural beauty. Explore this UNESCO World Heritage Site, home to some of the oldest and most majestic cedar trees on Earth. The forest\'s significance transcends borders, with its historical importance in construction and religious texts. Walk among these awe-inspiring giants and experience the serenity of this unique natural sanctuary. Thanks for your interest.'
    },
    {
      name: 'JeitaGrotto',
      description: 'Welcome to Jeita Grotto, a natural wonder in Lebanon. This cave system, with its stunning stalactite and stalagmite formations, has captivated visitors for centuries. Descend into the lower grotto via a boat ride on an underground river, and marvel at the breathtaking crystal formations. The upper grotto offers a picturesque walk enchanting limestone sculptures. Jeita Grotto stands as a testament to the beauty of Lebanon\'s subterranean world, making it a must-visit destination for nature enthusiasts. Immerse yourself with the hidden wonders and geological marvels.'
    }
  ];

  constructor(
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private imageLocationService: ImageLocationService
  ) { }

  async uploadPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload Photo',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Choose from Gallery',
          icon: 'images',
          handler: () => {
            this.chooseFromGallery();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  takePhoto() {
    // Implement camera functionality here
    console.log('Take Photo clicked');
  }

  chooseFromGallery() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      this.file = file;  // Save the file for later use
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result as string;
        this.uploadImage();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  async uploadImage() {
    if (this.file) {
      const loading = await this.loadingController.create({
        message: 'Predicting location...',
      });
      await loading.present();

      this.imageLocationService.uploadImage(this.file).subscribe(
        response => {
          console.log('Predicted class:', response.predicted_class);
          this.predictedLocation = this.locations.find(location => location.name === response.predicted_class) || null;
          console.log("predictedLocation",this.predictedLocation);
          loading.dismiss();
        },
        error => {
          console.error('Error uploading image:', error);
          loading.dismiss();
        }
      );
    }
  }

  uploadAnother() {
    // this.uploadedImage = '';
    // this.predictedLocation = null;
    this.uploadPhoto();
  }

  ngOnInit() {
  }
}
