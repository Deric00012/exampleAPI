import { Request, Response } from "express";

export class EjemploApiController {
  public async getAll(req: Request, res: Response): Promise<any> {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
    }

    // Base de datos temporal con contraseñas en texto plano
    const users = [
      {
        id: 1,
        user: "Deric.H",
        password: "12345678", // Contraseña en texto claro
        permisos: []
      },
      {
        id: 2,
        user: "Brayan.Oscal",
        password: "10101122", // Contraseña en texto claro
        permisos: []
      },
      {
        id: 2,
        user: "Luis.Yool",
        password: "87654321", // Contraseña en texto claro
        permisos: []
      },
      // Agregar más usuarios si es necesario...
    ];

    try {
      const findUser = users.find((u) => u.user === user);

      if (findUser) {
        // Verificación directa de contraseña en texto plano
        if (password === findUser.password) {
          // Retornar TODOS los campos incluyendo la contraseña
          return res.json(findUser); // Envía el objeto completo
        } else {
          return res.status(400).json({ message: "Contraseña incorrecta" });
        }
      } else {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
