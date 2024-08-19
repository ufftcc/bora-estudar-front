import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { StudyGroupService } from '../study-group.service';

@Component({
  selector: 'app-study-group-associate',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './study-group-associate.component.html',
  styleUrl: './study-group-associate.component.scss'
})
export class StudyGroupAssociateComponent implements OnInit {

  constructor(
    public service: StudyGroupService){}

  ngOnInit(): void {

  }

  associate() {
    const idUsuario = localStorage.getItem('idUsuario');
    const url = `https://discord.com/oauth2/authorize?client_id=1237632955145257021&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fdiscord%2Fusers%2F${idUsuario}&scope=identify`;
    window.open(url, '_blank');
  }

}
