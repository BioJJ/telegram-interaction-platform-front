/* eslint-disable @typescript-eslint/no-explicit-any */
export class Validator {
	static required(msg?: string) {
		return (v: any) => !!v || msg || 'Este campo é obrigatório'
	}

	static email() {
		return (v: any) => /.+@.+/.test(v) || 'E-mail precisa ter um formato válido'
	}

	static max(n: number) {
		return (v: any[]) => !v || v.length <= n || `O limite máximo é ${n}`
	}

	static min(n: number) {
		return (v: any[]) => !v || v.length >= n || `O mínimo é ${n}`
	}
}
