import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  getPosts(): void {
    this.apiService.getPosts().subscribe((data) => {
      console.log('Posts:', data);
      this.posts = data;
    });
  }

  createPost(): void {
    const newPost = { title: 'Nuevo Post', body: 'Contenido del post', userId: 1 };
    this.apiService.createPost(newPost).subscribe((data) => {
      console.log('Post creado:', data);
      this.posts.push(data);
    });
  }

  updatePost(): void {
    const updatedPost = { title: 'Post Actualizado', body: 'Contenido actualizado' };
    this.apiService.updatePost(1, updatedPost).subscribe((data) => {
      console.log('Post actualizado:', data);
    });
  }

  deletePost(): void {
    this.apiService.deletePost(1).subscribe(() => {
      console.log('Post eliminado');
      this.posts = this.posts.filter((post) => post.id !== 1);
    });
  }
}
