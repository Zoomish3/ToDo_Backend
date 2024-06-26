import { Module } from '@nestjs/common'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'
import { Task } from './model/task.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/model/user.model'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [SequelizeModule.forFeature([Task, User]), UserModule],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService],
})
export class TaskModule {}
