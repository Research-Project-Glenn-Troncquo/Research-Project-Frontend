import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { routes } from 'src/app/app-routing.module'
import { AuthService } from 'src/app/auth/firebase.service'
import { ComponentsModule } from 'src/app/components/components.module'
import { FakeAuthService } from '../register/register.component.spec'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { DashboardComponent } from './dashboard.component'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { User } from 'src/app/interface/user'
import { IsFollowing } from 'src/app/interface/isfollowing'
import { Post } from 'src/app/interface/post'
import { Comment } from 'src/app/interface/comment'

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>
  let fakeService: FakeAuthService
  let de: DebugElement
  let user: User

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        ComponentsModule,
        CommonModule,
        HttpClientTestingModule,
      ],

      providers: [{ provide: AuthService, useClass: FakeAuthService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    user = {
      name: 'Glenn',
      lastname: 'Troncquo',
      username: 'glenn',
      email: 'glenn',
    }
    component.user = user
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have a div for the username', () => {
    const usernameHtml = de.query(By.css('.username')).nativeElement
    expect(usernameHtml).toBeTruthy()

    expect(usernameHtml.innerText).toBe('glenn')
    expect(component.user.username).toEqual(usernameHtml.innerText)
  })

  it('should have an img for the profile', () => {
    const profileImgHml = de.query(By.css('.profile-img')).nativeElement
    expect(profileImgHml).toBeTruthy()

    expect(profileImgHml['src']).toContain('no-profile.png')
  })

  describe('img for the profile', () => {
    beforeEach(() => {
      user.img_url = 'testurl'
      component.user = user
      fixture.detectChanges()
    })
    it('should equal the databinding', () => {
      const profileImgHml = de.query(By.css('.profile-img')).nativeElement
      expect(profileImgHml['src']).toContain('testurl')
    })
  })

  it('should have a p tag for followings', () => {
    const followingHtml = de.query(By.css('.following')).nativeElement
    expect(followingHtml).toBeTruthy()

    expect(followingHtml.innerText).toBe('Following')
  })

  it('should have a p tag for the amount of followings', () => {
    const followingHtml = de.query(By.css('.following-count')).nativeElement
    expect(followingHtml).toBeTruthy()

    expect(followingHtml.innerText).toBe('0')
  })

  it('should have a p tag for followers', () => {
    const followersHtml = de.query(By.css('.followers')).nativeElement
    expect(followersHtml).toBeTruthy()

    expect(followersHtml.innerText).toBe('Followers')
  })

  it('should have a p tag for the amount of followers', () => {
    const followersHtml = de.query(By.css('.followers-count')).nativeElement
    expect(followersHtml).toBeTruthy()

    expect(followersHtml.innerText).toBe('0')
  })

  describe('followers and followings count should be 5', () => {
    beforeEach(() => {
      const isFollowing: IsFollowing = {}
      user.isfollowing = [
        isFollowing,
        isFollowing,
        isFollowing,
        isFollowing,
        isFollowing,
      ]
      user.followers = ['', '', '', '', '']
      component.user = user
      fixture.detectChanges()
    })

    it('should have a p tag for the amount of followings', () => {
      const followingHtml = de.query(By.css('.following-count')).nativeElement
      expect(followingHtml).toBeTruthy()

      expect(followingHtml.innerText).toBe('5')
      // expect(component.user.isfollowing?.length).toEqual(
      //   followingHtml.innerText
      // )
    })

    it('should have a p tag for the amount of followers', () => {
      const followersHtml = de.query(By.css('.followers-count')).nativeElement
      expect(followersHtml).toBeTruthy()

      expect(followersHtml.innerText).toBe('5')
    })
  })

  it('should have a p tag for activities', () => {
    const activitiessHtml = de.query(By.css('.activities')).nativeElement
    expect(activitiessHtml).toBeTruthy()

    expect(activitiessHtml.innerText).toBe('Activities')
  })

  it('should have a p tag for the amount of followers', () => {
    const activitiesHtml = de.query(By.css('.activities-count')).nativeElement
    expect(activitiesHtml).toBeTruthy()

    expect(activitiesHtml.innerText).toBe('0')
  })

  describe('activities count should be 5', () => {
    beforeEach(() => {
      const post: Post = {}
      user.posts = [post, post, post, post, post]
      component.user = user
      fixture.detectChanges()
    })

    it('should have a p tag for the amount of followers', () => {
      const activitiesHtml = de.query(By.css('.activities-count')).nativeElement
      expect(activitiesHtml).toBeTruthy()

      expect(activitiesHtml.innerText).toBe('5')
    })
  })

  it('should have a p tag for latest activities', () => {
    const activitiessHtml = de.query(By.css('.latest-activity')).nativeElement
    expect(activitiessHtml).toBeTruthy()

    expect(activitiessHtml.innerText).toBe('Latest Activity')
  })

  it('should have a p tag for latest activities', () => {
    const activitiessHtml = de.query(By.css('.your-activities')).nativeElement
    expect(activitiessHtml).toBeTruthy()

    expect(activitiessHtml.innerText).toBe('Your Activities')
  })

  describe('Posts still loading', () => {})

  describe('Posts loaded', () => {
    beforeEach(() => {
      const comment: Comment = { comment: 'Dat ziet er leuk uit' }
      const post: Post = {
        comments: [comment],
        description: 'Leuk aan de bar',
        title: 'barmadam',
        img_url: 'testurl',
      }
      component.posts = [post]
      component.postsLoading = false
    })
    it('should contain the app-post component', () => {
      const postsSection = de.query(By.css('.post-section')).nativeElement

      expect(de.query(By.css('app-post-ghost')).nativeElement).toBeDefined()
    })
  })
})
