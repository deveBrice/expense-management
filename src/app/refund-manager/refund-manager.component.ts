import { AfterViewInit, Component, computed, effect, inject, model, OnDestroy, signal, ViewChild } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AddRefundComponent } from './add-refund/add-refund.component';
import { RefundFilterComponent } from './refund-filter/refund-filter.component';

import { RefundManagerService } from '../../shared/services/refund-manager.service';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RefundManager, refundList } from '../../shared/interfaces/refund-manager.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RefundManagerDemoService } from '../../shared/services/refund-manager.demo.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, delay, map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { RefundManagerRequest } from '../../shared/services/refund-manager-request.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-refund-manager',
  imports: [
    FormsModule,
    CommonModule,
    AddRefundComponent,
    RefundFilterComponent,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './refund-manager.component.html',
  styleUrl: './refund-manager.component.scss',
})

export class RefundManagerComponent {

  public displayedColumns: string[] = ['num', 'wording', 'amount', 'dates', 'delete', 'edit'];
  public refundData = signal<any>({});
  public refundFieldUpdate = new FormControl(0, [Validators.required])
  public refundStateUpdate = signal<boolean>(false);

  public newRefundData = signal<any>({});
  public refreshData$ = new Subject<void>()
  public indexRefund = signal<number | undefined>(undefined)
  public refundState = signal<boolean>(false)

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public rmds = inject(RefundManagerDemoService);
  public rms = inject(RefundManagerService);
  public rmr = inject(RefundManagerRequest);
  public fb = inject(FormBuilder);
  public dateAdapter = inject(DateAdapter<Date>);
  public datePipe = inject(DatePipe)

  public momentData = signal({
    month: this.rms.currentMonth(),
    year: new Date().getFullYear()
  })

  public editForm: FormGroup = this.fb.group({
    wording: [''],
    amount: [''],
    date: ['']
  })

  constructor() {
    this.rmr.setMomentData(this.momentData())
  }


  public addRefund() {
    this.rmr.createNewRefund(this.rms.getNewRefund()).subscribe();
    this.rmr.reloadRefund();
  }

  public displayRefund$: Observable<RefundManager> = this.rmr.refundsObs$
    .pipe(map((result: any) => {
      if (result !== null) {
        const dataSourceOptions = new MatTableDataSource(result.refundList)
        this.refundData.set(result)

        const newRefund = {
          ...result,
          refundList: dataSourceOptions
        }
        dataSourceOptions.paginator = this.paginator;

        return newRefund
      }
    }))

  public displayRefund = toSignal(this.displayRefund$, { initialValue: this.rms.getNewRefund() })


  public newRefund($event: refundList): void {
    $event['id'] = this.refundData().refundList.length;

    this.rmr.createRefund($event, this.refundData()._id).subscribe()

    this.rmr.reloadRefund();
  }

  public amountEdit(): void {
    this.refundFieldUpdate.patchValue(this.refundData().totalAmount);
    this.refundStateUpdate.set(!this.refundStateUpdate())
  }

  public updateRefund(): void {
    const totalRefund = this.refundFieldUpdate.value as number;
    this.refundData().totalAmount = +totalRefund;
    this.rmr.updateAmount(this.refundData(), this.refundData()._id).subscribe();
    this.refundStateUpdate.set(!this.refundStateUpdate())
    this.rmr.reloadRefund();
  }

  public deleteRefund(index: number) {
    const refundList = this.refundData().refundList[index];
    this.rmr.deleteRefund(this.refundData()._id, refundList).subscribe()
    this.rmr.reloadRefund();
  }

  public refundFiltersList($event: any) {
    this.rmr.refundFilter($event, this.refundData()._id).subscribe((res: RefundManager) => {
      console.log(res);
    });
  }

  public refundFiltred = computed(() => {

    return this.newRefundData()
  })

  public refundFilter(obj: any, key: any, value: any) {
    let result: boolean = false;
    result = obj.refundData[key].toString().includes(value.toString());
    return result
  }

  public refundMoments($event: any) {
    this.rms.setDate($event)
    this.rmr.setMomentData($event)
  }

  public editRefundState = computed(() => this.refundState() ? false : true)

  public editRefund(index: number) {
    this.refundState.set(true);
    this.indexRefund.set(index);
    let refundData = this.refundData().refundList[index];

    let dateArray = refundData.date.split('/');
    let usDate = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2]

    this.editForm.patchValue({
      wording: refundData.wording,
      amount: refundData.amount,
      date: new Date(usDate)
    });
  }


  public editValidate() {
    this.refundState.set(false);
    let frDate = this.rms.dateFormat(this.editForm.value.date);
    this.editForm.value.date = frDate;
    let refundData = {...this.editForm.value, id: this.indexRefund()}
    this.rmr.updateRefund(refundData, this.refundData()._id).subscribe();
    this.rmr.reloadRefund();
  }
}
