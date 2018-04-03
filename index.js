/**
 * QuickMath Programming Interface (QPI) - Client
 * https://www.quickmath.io/
 *
 * Copyright 2018 QuickMath Authors. All Rights Reserved.
 */
const QUICKMATH_ORIGIN = "https://quickmath.io";
const APP_ORIGIN = window.origin;
const DEFAULT_HANDLER = latexCode => console.log(latexCode);

const QPI = window.QPI || {};

let id = parseInt(QPI.id) || 0; // For distinguishing different edit calls.

QPI.edit = (init = "", changeHandler = DEFAULT_HANDLER, _isDev = false) => {
  const EDITOR_ORIGIN = _isDev ? APP_ORIGIN : QUICKMATH_ORIGIN;
  const editId = id;
  window.open(`${EDITOR_ORIGIN}/edit?origin=${APP_ORIGIN}&id=${id}#latex=${init}`);
  window.addEventListener("message", event => {
    if (event.origin !== EDITOR_ORIGIN) return;
    const eventId = parseInt(event.data.id);
    if (eventId !== editId) return;
    changeHandler(event.data.latexCode);
  });
  id++;
};

window.QPI = QPI;
