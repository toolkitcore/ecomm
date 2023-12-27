import { OrderTrackingTimelineComponent } from './components/order-tracking-timeline/order-tracking-timeline.component';
import { OrderTrackingFormComponent } from './components/order-tracking-form/order-tracking-form.component';
import { OrderTrackingInfoComponent } from './components/order-tracking-info/order-tracking-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderTrackingComponent } from './order-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: OrderTrackingComponent,
    children: [
      {
        path: 'info',
        component: OrderTrackingInfoComponent
      },
      {
        path: '',
        component: OrderTrackingFormComponent
      },
      {
        path: 'timeline',
        component: OrderTrackingTimelineComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderTrackingRoutingModule { }
