import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatConvPage } from './chat-conv.page';

const routes: Routes = [
  {
    path: '',
    component: ChatConvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatConvPageRoutingModule {}
