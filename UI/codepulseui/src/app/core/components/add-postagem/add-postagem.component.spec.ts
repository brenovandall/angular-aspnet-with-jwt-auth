import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostagemComponent } from './add-postagem.component';
import { MarkdownModule } from 'ngx-markdown';

describe('AddPostagemComponent', () => {
  let component: AddPostagemComponent;
  let fixture: ComponentFixture<AddPostagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPostagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPostagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
