import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';
import { PublishedDate } from '../../../types';

@Entity()
export class Todo extends Aggregate {
  @Column()
  publishedDate!: string;

  @Column()
  done!: boolean;

  @Column()
  content!: string;

  constructor(args: { publishedDate: PublishedDate; done: boolean; content: string }) {
    super();
    if (args) {
      this.publishedDate = args.publishedDate;
      this.done = args.done;
      this.content = args.content;
    }
  }

  static Of(args: { publishedDate: PublishedDate; done: boolean; content: string }) {
    return new Todo(args);
  }
}
