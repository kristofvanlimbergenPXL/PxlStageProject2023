import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProposalListComponent } from './proposal-list/proposal-list.component';
import { ProposalDetailComponent } from './proposal-detail/proposal-detail.component';
import { SharedModule } from '../shared/app.shared.module';
import { StatusToColorPipe } from '../pipes/status-to-color.pipe';
import { AddToCollectionDialogComponent } from './add-to-collection-dialog/add-to-collection-dialog.component';
import { ConversationDetailComponent } from './conversation-detail/conversation-detail.component';
import { StatusToDisplayNamePipe } from '../pipes/status-to-display-name.pipe';
import { SendToPromotorDialogComponent } from './send-to-promotor-dialog/send-to-promotor-dialog.component';

const routes: Routes = [
  { path: '', component: ProposalListComponent },
  { path: 'detail/:id', component: ProposalDetailComponent },
  { path: 'conversation/:id', component: ConversationDetailComponent },
];

@NgModule({
  declarations: [
    ProposalListComponent,
    ProposalDetailComponent,
    StatusToColorPipe,
    StatusToDisplayNamePipe,
    AddToCollectionDialogComponent,
    ConversationDetailComponent,
    SendToPromotorDialogComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class ProposalModule {}
