import { ProcessSystemProcessControls } from "../../../../../src/interfaces/adpters/process/application/useCases/systemProcessControls/processSystemProcessControls";
import { Process } from "../../../../../src/interfaces/adpters/process/process";
import { SystemCommands } from "../../../../../src/interfaces/adpters/systemCommands/systemCommands";

const makeSut = (): any => {
    class ProcessStub implements Process {
        execute(data: any): Promise<any> {
            return new Promise((resolve, reject) => resolve(data));
        }
    }

    class SystemCommandsStub implements SystemCommands {
        readLogs(type: string, date: string) {
            throw new Error("Method not implemented.");
        }
        restart(data: string): string {
            return data;
        }
        removeLogs(): any {
            return "";
        }
    }

    const processStub = new ProcessStub();
    const systemCommandsStub = new SystemCommandsStub();
    const sut = new ProcessSystemProcessControls(processStub, systemCommandsStub);

    return { sut, processStub, systemCommandsStub };
};

describe("System Process Controls", () => {
    it("Should restart application", async () => {
        const { sut, processStub, systemCommandsStub } = makeSut();
        jest.spyOn(processStub, "execute");
        
        const response = await sut.restartApplication();

        expect(response).toBe("SGM");
        expect(processStub.execute).toHaveBeenCalledWith(systemCommandsStub.restart("SGM"));
    });
});
