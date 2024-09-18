import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { nullable } from "zod";




export  class Admin {
  @PrimaryColumn({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  id: string;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
    select:false
  })
  password: string;

  @Column({
    type: "enum",
    enum: ['ADMIN','EMPLOYEE'],
    default:'EMPLOYEE',
    nullable: false,
  })
  role: string;

  @CreateDateColumn()
  createAt:Date;

  @UpdateDateColumn()
  updateAt:Date;
}