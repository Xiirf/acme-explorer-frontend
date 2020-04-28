import { Component, OnInit, NgZone } from '@angular/core';
import { IPayPalConfig , ICreateOrderRequest } from 'ngx-paypal';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends TranslatableComponent implements OnInit {

  payPalConfig?: IPayPalConfig;

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private ngZone: NgZone) {
      super(translateService);
    }

  ngOnInit(): void {
    this.initConfig();
  }

  initConfig() {
    const price = this.route.snapshot.queryParams.price;
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'Ac-bwSbmRF7o6qyvv_hsKyYk8iMBeDak7a7uCKEWTqhDkK8dSnq8BQadJEjGgdyowDSzbYw1PALHngaH',
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'EUR',
                  value: price,
              },
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          console.log('Transaction was approved, but not authorized', data, actions);
          actions.order.get().then(details => {
              console.log('Order details : ', details);
          });
      },
      onClientAuthorization: (data) => {
        console.log('ici');
        const idApp = this.route.snapshot.queryParams.idApp;

        this.applicationService.updateApplicationToDue(idApp)
        .then(_ => {
          this.ngZone.run(() => this.router.navigate(['/applications']));
        })
        .catch(error => {
          console.log(error);
        });
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
      },
      onError: err => {
          console.log('OnError', err);
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
      },
    };
  }

}
