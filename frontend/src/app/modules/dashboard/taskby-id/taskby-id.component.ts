import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTaskService } from 'src/app/core/services/curd-task/add-task.service';

@Component({
  selector: 'app-taskby-id',
  templateUrl: './taskby-id.component.html',
  styleUrls: ['./taskby-id.component.scss'],
})
export class TaskbyIdComponent implements OnInit {
  @ViewChild('deleteTask') private deleteTask:
    | TemplateRef<TaskbyIdComponent>
    | undefined;
  private modalRefdeleteTask: any = NgbModalRef;

  title = '';
  task = '';
  id: any;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private service: AddTaskService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getTaskbyId(this.id).subscribe(
      (val: any) => {
        this.title = val.title;
        this.task = val.task;
      },
      (error) => {
        this.router.navigate(['/task']);
      }
    );
  }
  updateTask() {
    const data = { title: this.title, task: this.task };
    this.service.updateTask(this.id, data).subscribe((val: any) => {
      this.router.navigate(['/task']);
    });
  }
  openDeleteModal(deleteTask: any) {
    this.modalRefdeleteTask = this.modalService.open(this.deleteTask, {
      scrollable: true,
      centered: true,
    });
  }

  delete() {
    this.service.delTask(this.id).subscribe((val: any) => {
      this.modalRefdeleteTask.close();
      this.router.navigate(['/task']);
    });
  }
}
