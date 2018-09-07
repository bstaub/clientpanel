import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from '../../models/Client';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'bs-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;  // binding to template form

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    console.log(value, valid);
    if (this.disableBalanceOnAdd) {  // when input hidden true, send balance = 0, otherwise there would be no value!
      value.balance = 0;
    }

    if (!valid) {
      // show error
      this.flashMessage.show('Bitte fülle das Form korrekt aus', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.clientService.newClient(value);
      // Show Messages
      this.flashMessage.show('Neuer Client hinzugefügt', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dash
      this.router.navigate(['/']);
    }
  }

}
