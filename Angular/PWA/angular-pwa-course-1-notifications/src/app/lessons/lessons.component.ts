import { Component, OnInit } from '@angular/core';
import { LessonsService } from "../services/lessons.service";
import { Observable } from "rxjs/Observable";
import { Lesson } from "../model/lesson";
import { SwPush } from "@angular/service-worker";
import { NewsletterService } from "../services/newsletter.service";

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

    lessons$: Observable<Lesson[]>;
    isLoggedIn$: Observable<boolean>;

    readonly VAPID_PUBLIC_KEY = "BIizLjFA8VP-XVYsI5OYl67FzXtlCb0sSKjgkM5B-tEg8mWmWOM1fsoEInAR3rILhR3mAliCiYl0Y0Cd5wcg7yE";

    sub: any;

    constructor(
        private lessonsService: LessonsService,
        private swPush: SwPush,
        private newsletterService: NewsletterService) {

    }

    ngOnInit() {
        this.loadLessons();
    }


    loadLessons() {
        this.lessons$ = this.lessonsService.loadAllLessons().catch(err => Observable.of([]));
    }

    subscribeToNotifications() {
        if (this.swPush.isEnabled) {
            this.swPush.requestSubscription({
                serverPublicKey: this.VAPID_PUBLIC_KEY
            }).then(sub => {
                console.log("Notification Subscription", sub);
                this.newsletterService.addPushSubscriber(sub).subscribe(res => {
                    this.sub = sub;
                    console.log("Send push subscription object to the server");
                }, err => {
                    console.log("Could not send subscription object to the server. Reason: ", err)
                })
            }).catch(err => {
                console.log("Could not subscribe to notification", err);
            });
        }

    }


    sendNewsletter() {
        console.log("Sending Messages to all Subscribers...");

        this.newsletterService.send().subscribe();

    }





}
