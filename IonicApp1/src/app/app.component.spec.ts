import { async, TestBed } from "@angular/core/testing";
import { IonicModule, Platform } from "ionic-angular";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { StatusBarMock, SplashScreenMock, PlatformMock } from "ionic-mocks-jest";

import { MyApp } from "./app.component";
import { Settings } from "../providers";

// export class TranslateServiceStub{

// 	public get(key: any): any {
// 		return 'en';
//   }
  
//   public setDefaultLang(key: any): any {

//   }

//   public use(key: any): any {
		
//   }

//   public getBrowserLang(): any {
//     return 'en';
//   }
// }

export class SettingsServiceStub{

	public get(key: any): any {
		Observable.of(key);
	}
}

describe("MyApp Component", () => {
  let fixture;
  let component;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MyApp],
        imports: [IonicModule.forRoot(MyApp),
                
        ],
        providers: [
          { provide: StatusBar,  useFactory: () => StatusBarMock.instance() },
          { provide: SplashScreen,  useFactory: () => SplashScreenMock.instance() },
          { provide: Platform, useFactory: () => PlatformMock.instance() },
          { provide: Settings, useClass: SettingsServiceStub }
        ]
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it("should be created", () => {
    expect(component instanceof MyApp).toBe(true);
  });

  it("should have 14 pages", () => {
    expect(component.pages.length).toBe(14);
  });

  it("root should be tutorial", () => {
    console.log(component);
    expect(component.rootPage).toBe('TutorialPage');
  });
});
