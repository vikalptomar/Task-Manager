import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { AddTaskService } from 'src/app/core/services/curd-task/add-task.service';
import { NgToastService } from 'ng-angular-popup';
import { BehaviourService } from 'src/app/core/services/behaviour.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @ViewChild('addTask') private addTask:
    | TemplateRef<MainHeaderComponent>
    | undefined;
  @ViewChild('deleteTask') private deleteTask:
    | TemplateRef<MainHeaderComponent>
    | undefined;

  private modalRefaddTask: any = NgbModalRef;
  private modalRefdeleteTask: any = NgbModalRef;

  isCollapsed = true;
  data: string = '';
  title: string = '';
  task: string = '';
  loading: any;
  isDarkMode = false;

  constructor(
    private modalService: NgbModal,
    private addTaskService: AddTaskService,
    private toast: NgToastService,
    private behaviourService: BehaviourService,
    private router: Router,
    private common: CommonService,
    private cookieService: CookieService,
    private themeService: ThemeService
  ) {
    window.scroll(0, 0);
  }

  ngOnInit(): void {
    let theme = this.common.getCookie('theme');
    if (theme && theme == 'dark') {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }
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

  deleteAllModal(deleteTask: any) {
    this.modalRefdeleteTask = this.modalService.open(this.deleteTask, {
      scrollable: true,
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
        this.behaviourService.setId(1);
        this.modalRefaddTask.close();
        this.router.navigate(['/task']);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'New Task Added',
          duration: 3000,
        });
      }
    });
  }
  delAll() {
    this.addTaskService.delAllTask().subscribe((val: any) => {
      this.behaviourService.setId(2);
      this.modalRefdeleteTask.close();
    });
  }
  logout() {
    // if (this.common.getCookie('token')) {

    //   this.common.deleteCookie('token');
    //   this.router.navigate(['auth']);
    // } else if (this.common.getCookie('token')) {

    //   this.cookieService.delete('token');
    //   this.router.navigate(['auth']);
    // } else {

    //   this.router.navigate(['auth/']);
    // }
    this.cookieService.delete('token');
    this.cookieService.delete('token', '/');
    this.cookieService.delete('token', '/', 'localhost');
    this.router.navigate(['auth/']);
  }
  theme() {
    let theme = this.common.getCookie('theme');

    if (theme && theme == 'dark') {
      this.isDarkMode = false;
    } else {
      this.isDarkMode = true;
    }
    this.themeService.setTheme(this.isDarkMode);
  }
}
