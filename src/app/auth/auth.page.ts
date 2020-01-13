import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  Platform,
  ToastController
} from "@ionic/angular";
import { FcmService } from "../Services/fcm.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  isLogin = true;
  isLoading = true;
  showSpinner = false;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public alert: AlertController,
    public loadingctrl: LoadingController,
    private platform: Platform,
    public toastcontroller: ToastController,
    public fcm: FcmService,
    private authService: AuthService,

  ) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;

    if (this.isLogin) {
      // login
      this.authService.login(email, password);

    } else {
      // signup
    }
  }

  onSwitchAuthMode() {
    // toggle the isLogin value
    this.isLogin = !this.isLogin;
  }

 
}
