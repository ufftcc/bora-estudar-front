import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DiscordService } from '../../discord.service';

@Component({
  selector: 'app-study-group-associate-callback',
  standalone: true,
  imports: [],
  templateUrl: './study-group-associate-callback.component.html',
  styleUrl: './study-group-associate-callback.component.scss',
})
export class StudyGroupAssociateCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    public service: DiscordService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['state'];
      const code = params['code'];
      const localRouter = this.router;
      const localSnackBar = this.snackBar;

      const doAuthDiscordSubscriber = this.service
        .doAuthDiscord(code, userId)
        .subscribe({
          error(err) {
            console.error('Erro ao associar conta Discord:', err);
            localSnackBar.open(
              'Não foi possível associar a conta do Discord!',
              'X',
              {
                duration: 2500,
              }
            );
            // retornando ao associate
            localRouter.navigateByUrl('/associate');
          },
          next(value) {

            //console.log(value);
            localStorage.setItem('signed-user', JSON.stringify(value));
            // sucesso. envia para a home
            localRouter.navigateByUrl('/search');
            localSnackBar.open('Conta do Discord associada com sucesso!', 'X', {
              duration: 2500,
            });
          },
          complete() {
            doAuthDiscordSubscriber.unsubscribe();
          },
        });
    });
  }
}
