import {
    GetKeyGeoServiceRepositoryController,
    DeleteKeyGeoServiceRepositoryController,
    PostKeyGeoServiceRepositoryController,
    UpdateKeyGeoServiceRepositoryController,
} from "../../../interfaces/controllers/aplications/keyGeoServiceRepository";
import { Prisma } from "../../../infra/db/techs/prisma/sqlDrive/Prisma";
import { ProcessSystemProcessControls } from "../../../interfaces/adpters/process/application/useCases/systemProcessControls/processSystemProcessControls";
import { ChildProcess } from "../../../infra/systemProcess/childProcess/childProcess";
import { Pm2Commands } from "../../../infra/pm2/pm2Commands";
import {SqlRepository} from "../../../application/rules/repositories/sqlRepository/sqlRepository";
import {adptSqlRepository} from "../../../interfaces/adpters/sql/application/repository/adptSqlRepository";

export const getKeyGeoServiceRepositoryFactory = (): any => {
    return new GetKeyGeoServiceRepositoryController(SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'KeyGeoService')));
};

export const postKeyGeoServiceRepositoryFactory = (): any => {
    return new PostKeyGeoServiceRepositoryController(
        SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'KeyGeoService')),
        SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'Address')),
        new ProcessSystemProcessControls(new ChildProcess(), new Pm2Commands())
    )
};

export const updateKeyGeoServiceRepositoryFactory = (): any => {
    return new UpdateKeyGeoServiceRepositoryController(
        SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'KeyGeoService')),
        new ProcessSystemProcessControls(new ChildProcess(), new Pm2Commands())
    );
};

// export const deleteKeyGeoServiceRepositoryFactory = (): any => {
//     return new DeleteKeyGeoServiceRepositoryController(
//         SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'KeyGeoService')),
//         new ProcessSystemProcessControls(new ChildProcess(), new Pm2Commands())
//     );
// };
