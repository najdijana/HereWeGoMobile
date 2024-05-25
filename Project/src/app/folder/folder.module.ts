import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ComponentsModule } from '../modules/admin/chats/components.module';
import { HttpClientModule } from '@angular/common/http';
import { DestinationService } from '../modules/admin/top-destinations/destination.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    HttpClientModule ,
    //ChatbotComponent,
    ComponentsModule
  ],
  declarations: [FolderPage, ChatbotComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[DestinationService]
})
export class FolderPageModule {}
