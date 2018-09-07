import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/Client';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'bs-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string;
  // client: Client;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean = true;


  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // get id from url when component loads
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client);
    });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {  // Funktion debuggen!
    if (!valid) {
      this.flashMessage.show('Bitte füllen Sie das Formular korrekt aus', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add id to client (id is not in the form, we need id and have to add it manually from the url)
      value.id = this.id;
      // Update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client aktualisiert', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/client/' + this.id]);
    }
  }

}
