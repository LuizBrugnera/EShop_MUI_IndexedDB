import { openDB } from "idb";
import { getProdutosAPI } from "../servicos/ProdutoServico";
import _ from "lodash";
const DB_NAME = "eshop_mui_off";
const offlineProdutoDbName = "offlineProdutoStore";
const offlineCategoriaDbName = "offlineCategoriaStore";

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(offlineProdutoDbName)) {
        db.createObjectStore(offlineProdutoDbName, {
          keyPath: "codigo",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(offlineCategoriaDbName)) {
        db.createObjectStore(offlineCategoriaDbName, { keyPath: "id" });
      }
    },
  });
};

const addProdutoOffline = async (produto) => {
  if (!produto.codigo) {
    const maiorCodigoDoOffline = Math.max(
      ...(await getProdutosOffline()).map((p) => p.codigo)
    );

    if (maiorCodigoDoOffline < 9000) produto.codigo = 9000;

    produto.codigo = produto.codigo + maiorCodigoDoOffline + 1;
  }

  const db = await initDB();
  const tx = db.transaction(offlineProdutoDbName, "readwrite");
  const store = tx.objectStore(offlineProdutoDbName);
  await store.add(produto);
  await tx.done;
  return produto;
};

const getProdutosOffline = async () => {
  const db = await initDB();
  const tx = db.transaction(offlineProdutoDbName, "readonly");
  const store = tx.objectStore(offlineProdutoDbName);
  return await store.getAll();
};

const getOneProdutosOffline = async (codigo) => {
  const db = await initDB();
  const tx = db.transaction(offlineProdutoDbName, "readonly");
  const store = tx.objectStore(offlineProdutoDbName);
  const produtos = await store.getAll();

  return produtos.find((produto) => +produto.codigo === +codigo);
};

const updateProdutoOffline = async (codigo, produto) => {
  const db = await initDB();
  const tx = db.transaction(offlineProdutoDbName, "readwrite");
  const store = tx.objectStore(offlineProdutoDbName);
  console.log(produto, codigo);
  console.log(store, tx);
  await store.put({ ...produto, codigo });
  await tx.done;
};

const deleteProdutoOffline = async (codigo) => {
  const db = await initDB();
  const tx = db.transaction(offlineProdutoDbName, "readwrite");
  const store = tx.objectStore(offlineProdutoDbName);
  const produtos = await store.getAll();

  const produto = produtos.find((p) => p.codigo === codigo);
  if (produto) {
    await store.delete(produto.id);
  }

  await tx.done;
};

const findDifferences = (offlineProdutos, onlineProdutos) => {
  const differences = [];

  offlineProdutos.forEach((offlineProduto) => {
    const onlineProduto = onlineProdutos.find(
      (op) => op.codigo === offlineProduto.codigo
    );

    if (!onlineProduto) {
      differences.push({ offlineProduto, onlineProduto: null });
      return;
    }

    const diff = _.reduce(
      offlineProduto,
      (result, value, key) => {
        if (!_.isEqual(value, onlineProduto[key])) {
          result[key] = { offline: value, online: onlineProduto[key] };
        }
        return result;
      },
      {}
    );

    if (Object.keys(diff).length > 0) {
      differences.push({ offlineProduto, onlineProduto, diff });
    }
  });

  // Check for products that are online but not offline
  onlineProdutos.forEach((onlineProduto) => {
    const offlineProduto = offlineProdutos.find(
      (op) => op.codigo === onlineProduto.codigo
    );
    if (!offlineProduto) {
      differences.push({ offlineProduto: null, onlineProduto });
    }
  });

  return differences;
};

export const IndexedDB = {
  initDB,
  addProdutoOffline,
  getOneProdutosOffline,
  getProdutosOffline,
  updateProdutoOffline,
  deleteProdutoOffline,
  findDifferences,
};
