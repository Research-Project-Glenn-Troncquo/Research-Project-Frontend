import { NgModule } from '@angular/core'
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'
import { ButtonComponent } from './button/button.component'
import { AppRoutingModule } from '../app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { InputErrorComponent } from './input-error/input-error.component'
import { LoggedinHeaderComponent } from './loggedin-header/loggedin-header.component'
import { PostComponent } from './post/post.component'
import { PostCommentComponent } from './post-comment/post-comment.component'
import { LikeCommentComponent } from './like-comment/like-comment.component'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    InputErrorComponent,
    LoggedinHeaderComponent,
    PostComponent,
    PostCommentComponent,
    LikeCommentComponent,
  ],
  imports: [AppRoutingModule, FormsModule, ReactiveFormsModule, CommonModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    InputErrorComponent,
    LoggedinHeaderComponent,
    PostComponent,
    LikeCommentComponent,
  ],
})
export class ComponentsModule {}
