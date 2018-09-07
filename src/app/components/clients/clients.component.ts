import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/Client';

@Component({
  selector: 'bs-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwned: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      console.log(clients);
      this.clients = clients;
      this.getTotalOwned();
    });
  }

  getTotalOwned() {
    this.totalOwned = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);
  }

}
