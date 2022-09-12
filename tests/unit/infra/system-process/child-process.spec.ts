import { ChildProcess } from "../../../../src/infra/systemProcess/childProcess/childProcess";

const sut = new ChildProcess();

describe("Child Process", () => {
    it("Should execute a command", async () => {
        const data = "echo 'hello world'";
        
        const result = await sut.execute(data);

        expect(result).toBe("hello world\n");
    });

    it("Should send error if command fails", async () => {
        const data = "echo 'hello world' && exit 1";

        try {
            await sut.execute(data);
        } catch (error) {
            expect((error as Error).message).toMatch("Command failed");
        }
    });
});
