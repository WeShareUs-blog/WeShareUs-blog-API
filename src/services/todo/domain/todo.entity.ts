import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';

export type PublishedDate = string;
@Entity()
export class Todo extends Aggregate {
  @Column()
  publishedDate!: PublishedDate;

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
