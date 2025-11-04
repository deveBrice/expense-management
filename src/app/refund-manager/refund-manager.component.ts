import { Component, computed, effect, inject, model, signal, ViewChild } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewRefundComponent } from './new-refund/new-refund.component';

import { RefundManagerService } from '../../shared/services/refund-manager.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RefundData, RefundManager, refundManagerData } from '../../shared/interfaces/refund-manager.interface';
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

  public refundList = signal<RefundManager>(this.rms.getRefundList());

  public refundFieldUpdate = new FormControl(0, [Validators.required])

  public refundStateUpdate = signal<boolean>(false);

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

}
