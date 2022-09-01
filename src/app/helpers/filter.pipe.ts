import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(posts: Post[], searchInputValue?: string) {
    if (!posts) {
      return null;
    }

    if (!searchInputValue) {
      return posts;
    }

    // Convert to lower case
    searchInputValue = searchInputValue.toLowerCase();

    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchInputValue) ||
        post.body.toLowerCase().includes(searchInputValue)
      );
    });
  }
}
