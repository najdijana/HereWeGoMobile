import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatConvPageRoutingModule } from './chat-conv-routing.module';

import { ChatConvPage } from './chat-conv.page';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { EmptyScreenComponent } from '../empty-screen/empty-screen.component';
import { ComponentsModule } from '../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatConvPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ChatConvPage, ChatBoxComponent]
})
export class ChatConvPageModule {}
