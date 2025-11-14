import { Component, computed, effect, inject, model, signal, ViewChild } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewRefundComponent } from './new-refund/new-refund.component';
import { RefundFilterComponent } from './refund-filter/refund-filter.component';

import { RefundManagerService } from '../../shared/services/refund-manager.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RefundManager, refundManagerData } from '../../shared/interfaces/refund-manager.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-refund-manager',
  imports: [
    FormsModule,
    CommonModule,
    NewRefundComponent,
    RefundFilterComponent,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './refund-manager.component.html',
  styleUrl: './refund-manager.component.scss',
})

export class RefundManagerComponent {
  @ViewChild(MatTable) table!: MatTable<any>;

  public displayedColumns: string[] = ['num', 'wording', 'amount', 'date'];

  public rms = inject(RefundManagerService);

  public refundList = signal<RefundManager>(this.rms.refundManagerList());

  public refundFieldUpdate = new FormControl(0, [Validators.required])

  public refundStateUpdate = signal<boolean>(false);

  public filterListActive = signal<any>({})

  public refundFilterResult = signal<refundManagerData[]>(this.rms.refundManagerList().refundManagerData)

  public test: any[] = [];

  public newRefund($event: refundManagerData): void {
    this.rms.addNewRefund($event);
    this.table.renderRows();
  }

  public refundEdit(): void {
    this.refundFieldUpdate.patchValue(this.refundList().totalAmount);
    this.refundStateUpdate.set(!this.refundStateUpdate())
  }

  public refundUpdate(): void {
    const totalRefund = this.refundFieldUpdate.value as number;
    this.rms.refundUpdate(totalRefund)
    this.refundStateUpdate.set(!this.refundStateUpdate())
  }

  public refundFiltersList($event: any) {

    console.log(this.filterListActive())
    let refundList = this.rms.refundManagerList().refundManagerData.filter((rmd: any, index: number) =>
      Object.entries<any>($event).every(([key, value]) => {

        return rmd.refundData[key].toString().includes(value.toString());
      })
    );
    this.refundFilterResult.set(refundList);
    console.log(this.rms.refundManagerList())
  }

  public filtredRefundList = computed(() => {
    
    let newRefundFilter: RefundManager = {
      ...this.rms.getRefundList(),
      refundManagerData: this.refundFilterResult()
    }

    console.log(newRefundFilter)
    return newRefundFilter
  })

  public refundFilter(obj: any, key: any, value: any) {
    let result: boolean = false;
    result = obj.refundData[key].toString().includes(value.toString());
    return result
  }

}
