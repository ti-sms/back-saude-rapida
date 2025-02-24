export type SecretaryProps = {
    secretaryId: string;
    secretaryName: string;
    secretaryDescription: string | null;
};

export class Secretary {
    private constructor(readonly props: SecretaryProps) {}

    public static create(secretaryName: string, secretaryDescription: string | null) {
        return new Secretary({
            secretaryId: crypto.randomUUID().toString(),
            secretaryName: secretaryName,
            secretaryDescription: secretaryDescription
        })
    }


    public static with(secretaryId: string, secretaryName: string, secretaryDescription: string | null) {
        return new Secretary({
            secretaryId,
            secretaryName,
            secretaryDescription
        });
    }

    public get id(){
        return this.props.secretaryId;
    }

    public get name() {
        return this.props.secretaryName;
    }

    public get description(){
        return this.props.secretaryDescription;
    }

}