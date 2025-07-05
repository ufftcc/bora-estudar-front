import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { StudyGroupService } from '../study-group.service';
import { environment } from '../../../environments/environment';

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
  private encodedApiUrl = environment.encodedApiUrl;

  constructor(
    public service: StudyGroupService){}

  ngOnInit(): void {



  }

  associate() {
    const idUsuario = localStorage.getItem('idUsuario');
    const redirectUri = encodeURIComponent(
      `${this.encodedApiUrl}/associate/callback`
    );
    const url = `https://discord.com/oauth2/authorize?client_id=1237632955145257021&response_type=code&redirect_uri=${redirectUri}&scope=identify&state=${idUsuario}`;
    window.open(url, '_blank');
  }

}
