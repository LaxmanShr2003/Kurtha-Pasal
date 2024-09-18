import { AppDataSource } from "../config/ormconfigt";
import Exception from "../lib/exception";
import { adminRepository } from "./admin.repository";
import { createAdminType } from "./schema/admin.schema";

export const adminService = {
  async insert(data: createAdminType) {
    try {
      const isAdminExists = await adminRepository.getByEmail(data.email);
      if (isAdminExists) throw new Exception("Admin already exists", 403);
      const insertData = await adminRepository.create({ data });
      return insertData;
    } catch (err) {
      throw err;
    }
  },
  async updateAdmin(id: string, data: createAdminType) {
    try {
      const isAdminExists = await adminRepository.getById(id);
      if (!isAdminExists) throw new Exception("Admin not exists", 404);
      const isEmailExists = await adminRepository.getByEmail(data.email);
      if (isEmailExists) throw new Exception("Email already exists", 403);
      const insertData = await adminRepository.update({ id, data });
      return insertData;
    } catch (err) {
      throw err;
    }
  },
  async getAdmin(id: string) {
    try {
      const isAdminExists = await adminRepository.getById(id);
      if (!isAdminExists) throw new Exception("Admin not exists", 404);
      return isAdminExists;
    } catch (err) {
      throw err;
    }
  },
  async getAll() {
    try {
      const allData = await adminRepository.getAll();
      return allData;
    } catch (err) {
      throw err;
    }
  },
  async remove(id: string) {
    try {
      const isAdminExists = await adminRepository.getById(id);
      if (!isAdminExists) throw new Exception("Admin not found", 404);

      await adminRepository.delete({ id });
    } catch (err) {
      throw err;
    }
  },
  async findPassword(email:string){
    try{
       const isAdminExists = await adminRepository.getByEmail(email);
       if (!isAdminExists) throw new Exception("Admin not found", 404);

       const password = await adminRepository.getPassword({email});
       if(!password) throw new Exception("Password not found",404);

       return password;
    }catch(err){
      throw err;
    }

  }
};


