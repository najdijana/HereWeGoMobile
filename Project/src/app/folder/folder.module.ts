import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ServicesComponent } from './services/services.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ComponentsModule } from '../modules/admin/chats/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    //ChatbotComponent,
    ComponentsModule
  ],
  declarations: [FolderPage, ServicesComponent, ChatbotComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class FolderPageModule {}
