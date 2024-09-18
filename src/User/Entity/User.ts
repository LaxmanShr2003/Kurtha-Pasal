import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class BaseEntity {
  @PrimaryColumn({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  id: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: "enum",
    enum: ["MALE", "FEMALE"],
  })
  gender: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  phoneNumber: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hash() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
