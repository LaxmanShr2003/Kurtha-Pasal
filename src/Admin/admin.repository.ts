import { Admin } from "./Entity/admin.entity";
import { AppDataSource } from "../config/ormconfigt";
import { createAdminType } from "./schema/admin.schema";
import { unique } from "../lib/unique";

export const adminRepository = {
  async getById(id: string) {
    try {
      const adminId = id;
      const adminRepo = AppDataSource.getRepository(Admin);
      const admin = await adminRepo.findOne({
        where: {
          id: adminId,
        },
      });
      return admin;
    } catch (err) {
      console.log("Unable to find admin", err);
    }
  },
  async getByEmail(email: string) {
    try {
      const adminRepo = AppDataSource.getRepository(Admin);
      const admin = await adminRepo.findOne({
        where: {
          id: email,
        },
      });
      return admin;
    } catch (err) {
      console.log("Unable to find admin", err);
    }
  },
  async getAll() {
    try {
      const adminRepo = AppDataSource.getRepository(Admin);
      const allData = await adminRepo.find();
      return allData;
    } catch (err) {
      console.log("Unable to find admin data");
    }
  },
  async create({ data }: { data: createAdminType }) {
    try {
      const adminRepo = AppDataSource.getRepository(Admin);
      const savedAdmin = await adminRepo.save({
        id: unique(),
        email: data.email,
        password: data.password,
        role: data.role,
      });
      const { password, ...result } = savedAdmin;
      return result;
    } catch (err) {
      console.log("Failed to save admin data", err);
    }
  },
  async update({ id, data }: { id: string; data: createAdminType }) {
    try {
      const adminRepo = AppDataSource.getRepository(Admin);
      await adminRepo.update(
        { id },
        { email: data.email, password: data.password, role: data.role }
      );
      const updatedAdmin = await adminRepo.findOne({ where: { id } });
      return updatedAdmin;
    } catch (err) {
      console.log("Unable to update admin data");
    }
  },
  async delete({ id }: { id: string }) {
    try {
      const adminRepo = AppDataSource.getRepository(Admin);
      const admin = await adminRepo.findOne({ where: { id: id } });
      if (admin) {
        await adminRepo.remove(admin);
      }
    } catch (err) {
      console.log("Unable to remove the admin data", err);
    }
  },
  async changePassword({ id, password }: { id: string; password: string }) {
    try {
      const adminRepo = AppDataSource.getRepository(Admin);
      const data = await adminRepo.save({
        id: id,
        password: password,
      });
      return data;
    } catch (err) {
      console.log("Unable to change the password!");
    }
  },

  async getPassword({ email }: { email: string }) {
    try {
     
      const adminRepo = AppDataSource.getRepository(Admin);
      const password = await adminRepo.findOne({
        where: {
          email: email,
        },
        select: ["id", "password"],
      });
      return password ;
    } catch (err) {
      console.log("Unable to find password", err);
    }
  },
};
