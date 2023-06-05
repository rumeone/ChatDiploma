import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PrivateRoutingModule} from './private-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CreateRoomComponent} from './components/create-room/create-room.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import { SelectUsersComponent } from './components/select-users/select-users.component';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import { ChatRoomComponent } from './components/chat-room/chat-room.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CreateRoomComponent,
    SelectUsersComponent,
    ChatRoomComponent
  ],
    imports: [
        CommonModule,
        PrivateRoutingModule,
        MatListModule,
        MatPaginatorModule,
        MatButtonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatIconModule,
        MatLegacyChipsModule
    ]
})
export class PrivateModule {
}
