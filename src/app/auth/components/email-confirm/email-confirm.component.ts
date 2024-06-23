import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/security/auth/auth.service";

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css']
})
export class EmailConfirmComponent implements OnInit {
  message: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      this.authService.confirmEmail(token).subscribe({
        next: (data) => {
          console.log(data);
          this.message = data;
        },
        error: (err) => {
          console.error(err);
          this.message = 'Confirmation failed. The link might be expired or invalid.';
        },
      });
    });
  }
}
