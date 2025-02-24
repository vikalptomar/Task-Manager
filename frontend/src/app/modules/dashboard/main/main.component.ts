import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { AddTaskService } from 'src/app/core/services/curd-task/add-task.service';
import { BehaviourService } from 'src/app/core/services/behaviour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('addTask') private addTask: TemplateRef<MainComponent> | undefined;
  @ViewChild('deleteTask') private deleteTask:
    | TemplateRef<MainComponent>
    | undefined;
  private modalRefaddTask: any = NgbModalRef;
  private modalRefdeleteTask: any = NgbModalRef;

  data: any = ['1'];
  title: string = '';
  task: string = '';
  itemsPerScroll = 10;
  id: any;
  filter = '';

  displayedItems: any[] = [];

  currentIndex = 0;
  loading: any;
  loadingData: any;
  title_modal: any;

  constructor(
    private toast: NgToastService,
    private modalService: NgbModal,
    private addTaskService: AddTaskService,
    private behaviourService: BehaviourService,
    private router: Router
  ) {
    window.scroll(0, 0);
    document.title = 'Dashboard';
  }

  ngOnInit(): void {
    // this.toast.success({
    //   detail: 'SUCCESS',
    //   summary: 'New Task Added',
    //   duration: 3000,
    // });
    this.behaviourService.getId().subscribe((val: any) => {
      this.getAllTask();
    });
  }

  onScrollDown() {
    // Load more items on scroll
    this.loadItems();
  }

  reload() {
    this.getAllTask();
  }

  getAllTask() {
    this.currentIndex = 0;
    this.displayedItems = [];
    this.addTaskService.getAllTask().subscribe((val: any) => {
      this.data = val.reverse();
      this.loadItems();
    });
  }

  loadItems() {
    this.loadingData = true;
    if (this.currentIndex >= this.data.length) {
      this.loadingData = false;
    }
    setTimeout(() => {
      // Check if there are more items to display
      if (this.currentIndex < this.data.length) {
        this.loadingData = false;
        // Slice the data array to get the next set of items
        const itemsToAdd = this.data.slice(
          this.currentIndex,
          this.currentIndex + this.itemsPerScroll
        );
        // Add the items to the displayedItems array
        this.displayedItems = this.displayedItems.concat(itemsToAdd);

        // Update the current index for the next pagination
        this.currentIndex += this.itemsPerScroll;
      }
    }, 300);
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  addTaskModal(addTask: any) {
    this.loading = false;
    this.title = '';
    this.task = '';
    this.modalRefaddTask = this.modalService.open(this.addTask, {
      scrollable: true,
      size: 'lg',
      centered: true,
    });
  }

  addNewTask() {
    this.loading = true;
    console.log(this.title);
    console.log(this.task);
    const data = {
      title: this.title,
      task: this.task,
    };
    this.addTaskService.addTask(data).subscribe((val: any) => {
      console.log(val);
      if (val.status === 200) {
        // this.loading = false;
        this.getAllTask();
        this.modalRefaddTask.close();
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'New Task Added',
          duration: 3000,
        });
      }
    });
  }

  taskById(item: any) {
    console.log(item);
    this.router.navigate([`/task/${item._id}`]);
  }

  openDeleteModal(deleteTask: any, item: any) {
    this.id = item._id;
    this.title_modal = item.title;
    this.modalRefdeleteTask = this.modalService.open(this.deleteTask, {
      scrollable: true,
      centered: true,
    });
  }

  delete() {
    this.addTaskService.delTask(this.id).subscribe((val: any) => {
      this.getAllTask();
      this.modalRefdeleteTask.close();
    });
  }
}
