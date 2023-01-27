import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';
import { PublishedDate } from '../../../types';

@Entity()
export class Todo extends Aggregate {
  @Column()
  publishedDate!: string;

  @Column()
  userId!: string;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.todo, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  todoItems!: TodoItem[];

  constructor(args: { publishedDate: PublishedDate; userId: string }) {
    super();
    if (args) {
      this.publishedDate = args.publishedDate;
      this.userId = args.userId;
    }
  }

  static Of(args: { publishedDate: PublishedDate; userId: string }) {
    return new Todo(args);
  }
}

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  done!: boolean;

  @ManyToOne(() => Todo, (todo) => todo.todoItems)
  todo!: Todo;
}
