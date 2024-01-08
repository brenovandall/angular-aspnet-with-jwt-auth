/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostagemService } from './postagem.service';

describe('Service: Postagem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostagemService]
    });
  });

  it('should ...', inject([PostagemService], (service: PostagemService) => {
    expect(service).toBeTruthy();
  }));
});
