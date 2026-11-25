import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterSidePanel } from '../registerSidePanel';

describe('RegisterSidePanel', () => {
  let component: RegisterSidePanel;
  let fixture: ComponentFixture<RegisterSidePanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSidePanel],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterSidePanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
